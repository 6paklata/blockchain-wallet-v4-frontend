import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from 'services/StyleService'
import renderFaq from 'components/FaqDropdown'
import { equals, path, prop } from 'ramda'

import { Button, HeartbeatLoader, Link } from 'blockchain-info-components'
import {
  Form,
  CancelWrapper,
  ColLeft,
  ColRight,
  ColRightInner,
  InputWrapper,
  PartnerHeader,
  PartnerSubHeader
} from 'components/IdentityVerification'
import { cardOptionHelper, bankOptionHelper } from './mediumHelpers'
import media from 'services/ResponsiveService'

const PaymentForm = styled(Form)`
  ${media.mobile`
    flex-direction: column;
  `};
`
const PaymentColLeft = styled(ColLeft)`
  ${media.mobile`
    width: 100%;
  `};
`
const PaymentColRight = styled(ColRight)`
  ${media.mobile`
    width: 100%;
  `};
`
const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${media.mobile`
    flex-direction: column;
    align-items: center;
  `};
`
const BorderBox = styled.div`
  border: 1px solid ${props => props.theme['gray-1']};
  padding: 30px;
  ${media.mobile`
    padding: 20px;
  `};
`
const FaqWrapper = styled.div`
  margin-top: 30px;
`
const ButtonContainer = styled.div`
  margin-top: 45px;
  ${media.mobile`
    margin-top: 20px;
  `};
`
const PaymentColRightInner = styled(ColRightInner)`
  ${media.mobile`
    width: 100%;
    padding-left: 0px;
  `};
`

const faqQuestions = [
  {
    question: (
      <FormattedMessage
        id='coinifyexchangedata.payment.helper1.question'
        defaultMessage='Are there transaction fees?'
      />
    ),
    answer: (
      <FormattedMessage
        id='coinifyexchangedata.payment.helper1.answer'
        defaultMessage='There is a 3% convenience fee when buying bitcoin with a credit card in order to expedite the transaction. Buying or selling through a bank transfer does not include a convenience fee, although there is a small trading fee (0.25%) that Coinify requires in order to mitigate risk.'
      />
    )
  }
]

const busyHelper = busy =>
  !busy ? (
    <FormattedMessage
      id='coinifyexchangedata.payment.continue'
      defaultMessage='Continue'
    />
  ) : (
    <HeartbeatLoader height='20px' width='20px' color='white' />
  )
const isCardDisabled = (q, l) => {
  if (q.baseCurrency === 'BTC') {
    return Math.abs(q.quoteAmount) > l.card.inRemaining[q.quoteCurrency]
  } else return Math.abs(q.baseAmount) > l.card.inRemaining[q.baseCurrency]
}
const isBankDisabled = (q, l, kyc, subTrade) => {
  const disableForKyc =
    equals(kyc, 'reviewing') ||
    equals(kyc, 'pending') ||
    equals(kyc, 'processing')
  const disableForLimits =
    q.baseCurrency === 'BTC'
      ? Math.abs(q.quoteAmount) >
        path(['bank', 'inRemaining', q.quoteCurrency], l)
      : Math.abs(q.baseAmount) >
        path(['bank', 'inRemaining', q.baseCurrency], l)
  const disableForSubscription = subTrade

  if (disableForSubscription) return 'disable_subscription'
  if (disableForKyc) return 'disable_kyc'
  if (disableForLimits) return 'disable_limits'
}

const Payment = props => {
  const {
    value,
    busy,
    coinifyNextCheckoutStep,
    handlePaymentClick,
    medium,
    isSubscriptionTrade,
    triggerKyc,
    openPendingKyc,
    quote,
    handlePrefillCardMax
  } = props
  const { limits, level, kyc } = value
  const kycState = path(['state'], kyc)
  const cardDisabled = isCardDisabled(quote, limits)
  const bankDisabled = isBankDisabled(quote, limits, kycState, isSubscriptionTrade)
  if (bankDisabled && medium !== 'card') handlePaymentClick('card')
  const prefillCardMax = limits => handlePrefillCardMax(limits)

  const isChecked = type => medium === type

  const onClickHelper = () => {
    if (prop('name', level) < 2 && medium === 'bank') triggerKyc()
    else coinifyNextCheckoutStep('summary')
  }

  return (
    <PaymentForm>
      <PaymentColLeft>
        <BorderBox>
          <InputWrapper style={spacing('mb-40')}>
            <PartnerHeader>
              <FormattedMessage
                id='coinifyexchangedata.payment.header'
                defaultMessage='Select Payment Method'
              />
            </PartnerHeader>
            <PartnerSubHeader>
              <FormattedMessage
                id='coinifyexchangedata.payment.subheader'
                defaultMessage='You can link your bank account or credit card to buy cryptocurrency. Select the account that you would like to use to fund your purchases. You can always change your payment method.'
              />
            </PartnerSubHeader>
          </InputWrapper>
          <PaymentWrapper>
            {bankOptionHelper(
              quote,
              limits,
              isChecked('bank'),
              handlePaymentClick,
              bankDisabled,
              openPendingKyc,
              kyc,
              level
            )}
            {cardOptionHelper(
              quote,
              limits,
              isChecked('card'),
              handlePaymentClick,
              cardDisabled,
              coinifyNextCheckoutStep,
              prefillCardMax
            )}
          </PaymentWrapper>
        </BorderBox>
      </PaymentColLeft>
      <PaymentColRight>
        <PaymentColRightInner>
          <ButtonContainer>
            <Button
              nature='primary'
              fullwidth
              onClick={onClickHelper}
              disabled={!medium || busy}
            >
              {busyHelper(busy)}
            </Button>
          </ButtonContainer>
          <CancelWrapper>
            <Link onClick={() => coinifyNextCheckoutStep('checkout')}>
              <FormattedMessage
                id='coinifyexchangedata.payment.cancel'
                defaultMessage='Cancel'
              />
            </Link>
          </CancelWrapper>
          <FaqWrapper>{renderFaq(faqQuestions)}</FaqWrapper>
        </PaymentColRightInner>
      </PaymentColRight>
    </PaymentForm>
  )
}

Payment.propTypes = {
  value: PropTypes.object.isRequired,
  busy: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handlePaymentClick: PropTypes.func.isRequired,
  medium: PropTypes.string,
  triggerKYC: PropTypes.func
}

export default reduxForm({ form: 'coinifyPayment' })(Payment)
