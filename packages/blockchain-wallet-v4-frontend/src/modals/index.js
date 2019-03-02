import React from 'react'

<<<<<<< HEAD
import {
  DeleteAddressLabel,
  ShowUsedAddresses,
  UpgradeAddressLabels
} from './Addresses'
import { RequestBch, SendBch } from './Bch'
import {
  AddBtcWallet,
  ImportBtcAddress,
  RequestBtc,
  SendBtc,
  ShowBtcPrivateKey
} from './Btc'
import {
  CoinifyDeleteBank,
  CoinifyExchangeData,
  CoinifyTradeDetails
} from './Coinify'
import { RequestEth, SendEth, ShowEthPrivateKey, TransferEth } from './Eth'
import {
  ExchangeDetails,
  ExchangeResults,
  IdentityVerification,
  SwapGetStarted,
  UserExists,
  SunRiverLinkError
} from './Exchange'
import { Confirm, PromptInput } from './Generic'
import {
  LockboxAppManager,
  LockboxFirmware,
  LockboxSetup,
  PromptLockbox
} from './Lockbox'
import { MobileLogin, MobileNumberChange, MobileNumberVerify } from './Mobile'
=======
import AddBitcoinWallet from './AddBtcWallet'
import AutoDisconnection from './AutoDisconnection'
import CoinifyDeleteBank from './CoinifyDeleteBank'
import CoinifyExchangeData from './CoinifyExchangeData'
import CoinifyTradeDetails from './CoinifyTradeDetails'
import CoinifyRecurringBuyConfirm from './CoinifyRecurringBuyConfirm'
import Confirm from './Confirm'
import ConfirmDisable2FA from './ConfirmDisable2FA'
import DeleteAddressLabel from './DeleteAddressLabel'
import EditTxDescription from './EditTxDescription'
import ExchangeDetails from './ExchangeDetails'
import ExchangeResults from './ExchangeResults'
import IdentityVerification from './IdentityVerification'
import ImportBtcAddress from './ImportBtcAddress'
import MobileNumberChange from './MobileNumberChange'
import MobileNumberVerify from './MobileNumberVerify'
import MobileLogin from './MobileLogin'
>>>>>>> origin/feat/recurring_buy
import Onfido from './Onfido'
import QRCode from './QRCode'
import {
  SfoxEnterMicroDeposits,
  SfoxExchangeData,
  SfoxTradeDetails
} from './Sfox'
import SignMessage from './SignMessage'
import { EditTxDescription, TransactionReport } from './Transactions'
import {
  AutoDisconnection,
  ConfirmDisable2FA,
  SecondPassword,
  TwoStepGoogleAuthenticator,
  TwoStepSetup,
  TwoStepYubico
} from './Settings'
import { PairingCode, ShowXPub, UpgradeWallet, Welcome } from './Wallet'
import {
  RequestXlm,
  SendXlm,
  ShowXlmPrivateKey,
  SunRiverWelcome,
  XlmCreateAccountLearn,
  XlmReserveLearn
} from './Xlm'

const Modals = props => (
  <div>
    <AddBtcWallet />
    <AutoDisconnection />
    <CoinifyDeleteBank />
    <CoinifyExchangeData />
    <CoinifyTradeDetails />
    <CoinifyRecurringBuyConfirm />
    <Confirm />
    <ConfirmDisable2FA />
    <DeleteAddressLabel />
    <EditTxDescription />
    <ExchangeDetails />
    <ExchangeResults />
    <IdentityVerification />
    <ImportBtcAddress />
    <LockboxAppManager disableOutsideClose />
    <LockboxFirmware />
    <LockboxSetup />
    <MobileNumberChange />
    <MobileNumberVerify />
    <MobileLogin />
    <Onfido />
    <PairingCode />
    <PromptInput />
    <PromptLockbox />
    <QRCode />
    <RequestBch />
    <RequestBtc />
    <RequestEth />
    <RequestXlm />
    <SecondPassword />
    <SendBch />
    <SendBtc />
    <SendEth />
    <SendXlm />
    <ShowBtcPrivateKey />
    <ShowEthPrivateKey />
    <ShowXlmPrivateKey />
    <ShowUsedAddresses />
    <SignMessage />
    <ShowXPub />
    <SfoxExchangeData />
    <SfoxTradeDetails />
    <SfoxEnterMicroDeposits />
    <SunRiverLinkError />
    <SwapGetStarted />
    <TransactionReport />
    <TransferEth />
    <TwoStepGoogleAuthenticator />
    <TwoStepSetup />
    <TwoStepYubico />
    <UpgradeAddressLabels />
    <UpgradeWallet />
    <UserExists />
    <Welcome />
    <XlmCreateAccountLearn />
    <XlmReserveLearn />
    <SunRiverWelcome disableOutsideClose />
  </div>
)

export default Modals
