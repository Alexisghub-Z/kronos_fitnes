# 🔐 Sistema de Domiciliación de Tarjetas - KHRONOS FITNESS

## ¿Qué es la Domiciliación de Tarjetas?

La **domiciliación de tarjetas** (también conocida como tokenización o pagos recurrentes) es un sistema que permite:

1. **Guardar tarjetas de forma segura** para futuros pagos
2. **Cobros automáticos mensuales** sin intervención del usuario
3. **Renovación automática de membresías** al finalizar cada período

## 🎯 Implementación Actual (Simulada)

### Flujo de Usuario:

1. **En el Checkout** (`/checkout`):
   - ✅ Checkbox para "Guardar tarjeta para futuros pagos"
   - ✅ Checkbox para "Activar renovación automática mensual"
   - Al guardar, se crea un "token" simulado (NO se guarda la tarjeta completa)

2. **En el Dashboard** (`/mi-cuenta` → Pestaña "Métodos de Pago"):
   - ✅ Ver tarjetas guardadas (solo últimos 4 dígitos)
   - ✅ Establecer tarjeta predeterminada
   - ✅ Eliminar tarjetas
   - ✅ Ver estado de renovación automática
   - ✅ Desactivar renovación automática

### Datos Almacenados (Simulados):

```javascript
// ❌ NUNCA se guarda esto:
{
  cardNumber: "4242424242424242", // ¡NO!
  cvv: "123" // ¡NO!
}

// ✅ Solo se guarda:
{
  id: "card_abc123",
  last4: "4242",
  brand: "visa",
  expiryMonth: "12",
  expiryYear: "28",
  holderName: "JUAN PEREZ",
  stripeToken: "tok_xyz789", // Token de Stripe
  isDefault: true
}
```

## 🚀 Implementación Real con Stripe

### Arquitectura de Stripe para Pagos Recurrentes:

```
┌─────────────┐
│   Cliente   │
│  (Frontend) │
└──────┬──────┘
       │ 1. Datos de tarjeta
       ▼
┌─────────────────┐
│  Stripe.js/     │
│  Elements       │ ← Maneja datos sensibles (PCI compliant)
└──────┬──────────┘
       │ 2. Token/Payment Method
       ▼
┌─────────────┐
│   Backend   │
│  (Node.js)  │
└──────┬──────┘
       │ 3. Crea Customer + attach PaymentMethod
       ▼
┌─────────────┐
│   Stripe    │
│   API       │
└─────────────┘
```

### Paso 1: Configuración Inicial

#### Backend (Node.js + Express):

```javascript
// config/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = stripe
```

#### Frontend:

```javascript
// src/config/stripe.js
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

### Paso 2: Guardar Tarjeta (Tokenización)

#### Frontend (Checkout.jsx):

```javascript
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const handleSubmit = async (e) => {
  e.preventDefault()
  const stripe = useStripe()
  const elements = useElements()

  if (saveCard) {
    // 1. Crear Payment Method con Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: cardData.cardName,
        email: user.email
      }
    })

    if (error) {
      toast.error(error.message)
      return
    }

    // 2. Enviar Payment Method ID al backend
    const response = await axios.post('/api/payment/save-card', {
      paymentMethodId: paymentMethod.id,
      setAsDefault: true,
      enableRecurring: enableAutoRenewal
    })

    if (response.data.success) {
      toast.success('Tarjeta guardada exitosamente')
    }
  }
}
```

#### Backend (routes/payment.js):

```javascript
router.post('/save-card', authenticate, async (req, res) => {
  try {
    const { paymentMethodId, setAsDefault, enableRecurring } = req.body
    const userId = req.user.id

    // 1. Buscar o crear Customer en Stripe
    let customer
    const user = await User.findById(userId)

    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId)
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: userId.toString() }
      })

      // Guardar Stripe Customer ID en la base de datos
      await User.findByIdAndUpdate(userId, {
        stripeCustomerId: customer.id
      })
    }

    // 2. Adjuntar Payment Method al Customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id
    })

    // 3. Establecer como predeterminado si se solicita
    if (setAsDefault) {
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
    }

    // 4. Obtener detalles del Payment Method
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    // 5. Guardar en base de datos local
    const savedCard = await PaymentMethod.create({
      userId,
      stripePaymentMethodId: paymentMethodId,
      last4: paymentMethod.card.last4,
      brand: paymentMethod.card.brand,
      expiryMonth: paymentMethod.card.exp_month,
      expiryYear: paymentMethod.card.exp_year,
      isDefault: setAsDefault
    })

    // 6. Si se activa cobro recurrente, crear Subscription
    if (enableRecurring) {
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_PRICE_ID }], // Price ID del plan
        default_payment_method: paymentMethodId,
        metadata: {
          userId: userId.toString(),
          plan: req.body.plan
        }
      })

      await RecurringPayment.create({
        userId,
        stripeSubscriptionId: subscription.id,
        status: 'active',
        nextChargeDate: new Date(subscription.current_period_end * 1000)
      })
    }

    res.json({ success: true, card: savedCard })
  } catch (error) {
    console.error('Error saving card:', error)
    res.status(500).json({ error: error.message })
  }
})
```

### Paso 3: Cobros Automáticos

Con Stripe Subscriptions, los cobros son **completamente automáticos**:

```javascript
// Stripe maneja automáticamente:
// 1. Cobro mensual en la fecha programada
// 2. Reintentos si falla el cobro
// 3. Emails de notificación
// 4. Actualización de estado

// Backend: Webhook para escuchar eventos
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Manejar eventos importantes
  switch (event.type) {
    case 'invoice.payment_succeeded':
      // Cobro exitoso
      const invoice = event.data.object
      await handleSuccessfulPayment(invoice)
      break

    case 'invoice.payment_failed':
      // Cobro fallido
      const failedInvoice = event.data.object
      await handleFailedPayment(failedInvoice)
      break

    case 'customer.subscription.deleted':
      // Suscripción cancelada
      const subscription = event.data.object
      await handleCanceledSubscription(subscription)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})
```

### Paso 4: Gestionar Tarjetas

#### Eliminar Tarjeta:

```javascript
// Backend
router.delete('/cards/:paymentMethodId', authenticate, async (req, res) => {
  try {
    const { paymentMethodId } = req.params

    // 1. Verificar que pertenece al usuario
    const card = await PaymentMethod.findOne({
      stripePaymentMethodId: paymentMethodId,
      userId: req.user.id
    })

    if (!card) {
      return res.status(404).json({ error: 'Tarjeta no encontrada' })
    }

    // 2. Detach de Stripe
    await stripe.paymentMethods.detach(paymentMethodId)

    // 3. Eliminar de base de datos
    await PaymentMethod.deleteOne({ _id: card._id })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

#### Establecer como Predeterminada:

```javascript
router.put('/cards/:paymentMethodId/set-default', authenticate, async (req, res) => {
  try {
    const { paymentMethodId } = req.params
    const user = await User.findById(req.user.id)

    // Actualizar en Stripe
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    })

    // Actualizar en base de datos local
    await PaymentMethod.updateMany(
      { userId: req.user.id },
      { isDefault: false }
    )

    await PaymentMethod.updateOne(
      { stripePaymentMethodId: paymentMethodId },
      { isDefault: true }
    )

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

#### Cancelar Renovación Automática:

```javascript
router.post('/recurring/cancel', authenticate, async (req, res) => {
  try {
    const recurring = await RecurringPayment.findOne({
      userId: req.user.id,
      status: 'active'
    })

    if (!recurring) {
      return res.status(404).json({ error: 'No hay renovación activa' })
    }

    // Cancelar en Stripe (al final del período actual)
    await stripe.subscriptions.update(recurring.stripeSubscriptionId, {
      cancel_at_period_end: true
    })

    // Actualizar en base de datos
    await RecurringPayment.updateOne(
      { _id: recurring._id },
      { status: 'canceling' }
    )

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

## 🔒 Seguridad y Cumplimiento PCI

### ¿Qué es PCI DSS?

**PCI DSS** (Payment Card Industry Data Security Standard) son regulaciones estrictas para proteger datos de tarjetas.

### Con Stripe:

✅ **Stripe es PCI Level 1 certified** (el nivel más alto)
✅ **No necesitas certificación PCI** si usas Stripe.js/Elements correctamente
✅ **Datos de tarjeta nunca tocan tu servidor**

### Flujo Seguro:

```
1. Usuario ingresa tarjeta → Stripe.js (browser)
2. Stripe.js envía datos → Servidores de Stripe
3. Stripe devuelve → Token/PaymentMethod ID
4. Tu frontend envía → Token a tu backend
5. Tu backend usa → Token para cobrar
```

❌ **NUNCA hagas esto:**
```javascript
// ¡MALO! No envíes datos de tarjeta a tu backend
fetch('/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    cardNumber: '4242424242424242', // ❌
    cvv: '123' // ❌
  })
})
```

✅ **Haz esto:**
```javascript
// ¡BUENO! Solo envía tokens
fetch('/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    paymentMethodId: 'pm_abc123' // ✅
  })
})
```

## 💰 Costos de Stripe (México)

- **2.9% + $3.00 MXN** por transacción exitosa
- **Sin cuota mensual** (solo pagas por uso)
- **Subscriptions incluidas** sin costo adicional
- **Webhooks incluidos**
- **Dashboard gratuito**

## 📊 Beneficios de la Domiciliación

### Para el Gimnasio:
- ✅ **Ingresos predecibles y recurrentes**
- ✅ **Menos trabajo administrativo**
- ✅ **Reducción de morosidad**
- ✅ **Mayor retención de clientes**

### Para el Cliente:
- ✅ **Comodidad** (no hay que recordar pagar)
- ✅ **Sin interrupciones** en el servicio
- ✅ **Fácil gestión** de métodos de pago
- ✅ **Puede cancelar en cualquier momento**

## 🧪 Cómo Probar (Ambiente Actual Simulado)

1. Inicia sesión: `admin@khronos.com` / `admin123`
2. Ve a **Planes y Precios**
3. Selecciona un plan → **Comenzar Ahora**
4. En el checkout:
   - ✅ Marca "Guardar tarjeta para futuros pagos"
   - ✅ Marca "Activar renovación automática mensual"
5. Usa tarjeta de prueba: `4242 4242 4242 4242`
6. Ve a **Mi Cuenta** → **Métodos de Pago**
7. Verás tu tarjeta guardada y la renovación automática activa

## 🔮 Próximos Pasos para Producción

1. **Crear cuenta en Stripe**: https://stripe.com/mx
2. **Instalar dependencias**:
   ```bash
   npm install stripe @stripe/stripe-js @stripe/react-stripe-js
   ```
3. **Implementar backend con Node.js + Express**
4. **Configurar webhooks en Stripe Dashboard**
5. **Implementar base de datos PostgreSQL**
6. **Integrar todo siguiendo los ejemplos de arriba**
7. **Testing exhaustivo en modo test de Stripe**
8. **Activar modo producción**

## 📚 Recursos Útiles

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Subscriptions**: https://stripe.com/docs/billing/subscriptions
- **Payment Methods**: https://stripe.com/docs/payments/payment-methods
- **Webhooks**: https://stripe.com/docs/webhooks
- **Testing**: https://stripe.com/docs/testing

---

**¿Preguntas?** Todo el código está simulado actualmente pero listo para integrar con Stripe real siguiendo los ejemplos de este documento.
