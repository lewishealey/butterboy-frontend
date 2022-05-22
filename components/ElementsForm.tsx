import React, { useState, FC } from 'react'

import CustomDonationInput from './CustomDonationInput'
import StripeTestCards from './StripeTestCards'
import PrintObject from './PrintObject'
import Link from 'next/link'

import { fetchPostJSON } from '../utils/api-helpers'
import {
  formatAmountForDisplay,
  formatAmountFromStripe,
} from '../utils/stripe-helpers'
import * as config from '../config'

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
const inputClasses = "h-11 border border-gray-300 px-3 rounded";

const ElementsForm: FC<{
  paymentIntent?: PaymentIntent | null
  onPaymentResolve: any
}> = ({ paymentIntent = null, onPaymentResolve }) => {

  const defaultAmout = formatAmountFromStripe(paymentIntent.amount, paymentIntent.currency)
  const [input, setInput] = useState({
    customDonation: 100,
    cardholderName: 'MR L Healey',
  })
  const [paymentType, setPaymentType] = useState('')
  const [payment, setPayment] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <span className="font-mono text-xs">Processing...</span>

      case 'requires_action':
        return <span className="font-mono text-xs">Authenticating...</span>

      case 'succeeded':
        return <span className="font-mono text-xs">Payment Succeeded 🥳</span>

      case 'error':
        return (
          <>
            <span className="font-mono text-xs">Error 😭</span>
            <p className="font-mono text-xs">{errorMessage}</p>
          </>
        )

      default:
        return null
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return
    if (!elements) return
    setPayment({ status: 'processing' })

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: defaultAmout,
      payment_intent_id: paymentIntent?.id,
    })
    setPayment(response)

    if (response.statusCode === 500) {
      setPayment({ status: 'error' })
      setErrorMessage(response.message)
      return
    }

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        // return_url: 'http://localhost:3000/donate',
        payment_method_data: {
          billing_details: {
            name: input.cardholderName,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setPayment({ status: 'error' })
      setErrorMessage(error.message ?? 'An unknown error occurred')
    } else if (paymentIntent) {
      setPayment(paymentIntent);
      onPaymentResolve(paymentIntent);
      setPayment({ status: 'succeeded' })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <StripeTestCards />
        <fieldset className="space-y-4">
          {paymentType === 'card' ? (
            <input
              placeholder="Cardholder name"
              className={inputClasses}
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              defaultValue={input.cardholderName}
              required
            />
          ) : null}
          <div className="space-y-4">
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type)
              }}
            />
          </div>
        </fieldset>
        <button
          className="bg-vibrant px-5 py-3 text-white font-body rounded text-lg hover:bg-red-500"
          type="submit"
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          {payment && payment.status ? payment.status : `Complete order ${defaultAmout}`}
        </button>
        <Link href="/cart">
          <button className='font-body px-5 py-3 text-lg rounded text-gray-600 hover:bg-black hover:bg-opacity-10'>Return to cart</button>
        </Link>
      </form>
      {/* <PaymentStatus status={payment.status} /> */}
      {/* <PrintObject content={payment} /> */}
    </>
  )
}

export default ElementsForm