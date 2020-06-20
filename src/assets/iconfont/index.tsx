/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconAccountFill from './IconAccountFill';
import IconHomeFill from './IconHomeFill';
import IconAddSelect from './IconAddSelect';
import IconSamiSelect from './IconSamiSelect';
import IconCamera from './IconCamera';
import IconArrowDown from './IconArrowDown';
import IconAccount from './IconAccount';
import IconComments from './IconComments';
import IconCartEmpty from './IconCartEmpty';
import IconFavorites from './IconFavorites';
import IconSearch from './IconSearch';
import IconHistory from './IconHistory';
import IconGift from './IconGift';
import IconPic1 from './IconPic1';
import IconQRcode from './IconQRcode';
import IconDiscount from './IconDiscount';
import IconEditor1 from './IconEditor1';
import IconEllipsis from './IconEllipsis';
import IconLink from './IconLink';
import IconMobilePhone from './IconMobilePhone';
import IconMove from './IconMove';
import IconNamecard from './IconNamecard';
import IconMap from './IconMap';
import IconPrompt from './IconPrompt';
import IconReturn from './IconReturn';
import IconRmb from './IconRmb';
import IconScanning from './IconScanning';
import IconSeleted from './IconSeleted';
import IconSoundFilling from './IconSoundFilling';
import IconSuccess from './IconSuccess';
import IconUnlock from './IconUnlock';
import IconAll from './IconAll';
import IconEditor from './IconEditor';
import IconNotvisible from './IconNotvisible';
import IconFavoritesFill from './IconFavoritesFill';
import IconArrowRight from './IconArrowRight';
import IconArrowLift from './IconArrowLift';
import IconArrowUp from './IconArrowUp';
import IconAshbin from './IconAshbin';
import IconBad from './IconBad';
import IconBrowse from './IconBrowse';
import IconClose from './IconClose';
import IconDoubleArroRight from './IconDoubleArroRight';
import IconDoubleArrowLeft from './IconDoubleArrowLeft';
import IconDownload from './IconDownload';
import IconEmail from './IconEmail';
import IconHelp from './IconHelp';
import IconGood from './IconGood';
import IconHot from './IconHot';
import IconPassword from './IconPassword';
import IconPic from './IconPic';
import IconRemind from './IconRemind';
import IconShare from './IconShare';
import IconUpload from './IconUpload';
import IconSet from './IconSet';
import IconExchangerate from './IconExchangerate';
import IconBadFill from './IconBadFill';
import IconGoodFill from './IconGoodFill';
import IconHotFill from './IconHotFill';
import IconCollection from './IconCollection';
import IconCollectionFill from './IconCollectionFill';
import IconHome from './IconHome';

export type IconNames = 'icon-account-fill' | 'icon-home-fill' | 'icon-add-select' | 'icon-sami-select' | 'icon-camera' | 'icon-arrow-down' | 'icon-account' | 'icon-comments' | 'icon-cart-Empty' | 'icon-favorites' | 'icon-search' | 'icon-history' | 'icon-gift' | 'icon-pic1' | 'icon-QRcode' | 'icon-discount' | 'icon-editor1' | 'icon-ellipsis' | 'icon-link' | 'icon-mobile-phone' | 'icon-move' | 'icon-namecard' | 'icon-map' | 'icon-prompt' | 'icon-return' | 'icon-rmb' | 'icon-scanning' | 'icon-seleted' | 'icon-sound-filling' | 'icon-success' | 'icon-unlock' | 'icon-all' | 'icon-editor' | 'icon-Notvisible' | 'icon-favorites-fill' | 'icon-arrow-right' | 'icon-arrow-lift' | 'icon-arrow-up' | 'icon-ashbin' | 'icon-bad' | 'icon-browse' | 'icon-close' | 'icon-double-arro-right' | 'icon-double-arrow-left' | 'icon-download' | 'icon-email' | 'icon-help' | 'icon-good' | 'icon-hot' | 'icon-password' | 'icon-pic' | 'icon-remind' | 'icon-share' | 'icon-upload' | 'icon-set' | 'icon-exchangerate' | 'icon-bad-fill' | 'icon-good-fill' | 'icon-hot-fill' | 'icon-collection' | 'icon-collection-fill' | 'icon-home';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-account-fill':
      return <IconAccountFill {...rest} />;
    case 'icon-home-fill':
      return <IconHomeFill {...rest} />;
    case 'icon-add-select':
      return <IconAddSelect {...rest} />;
    case 'icon-sami-select':
      return <IconSamiSelect {...rest} />;
    case 'icon-camera':
      return <IconCamera {...rest} />;
    case 'icon-arrow-down':
      return <IconArrowDown {...rest} />;
    case 'icon-account':
      return <IconAccount {...rest} />;
    case 'icon-comments':
      return <IconComments {...rest} />;
    case 'icon-cart-Empty':
      return <IconCartEmpty {...rest} />;
    case 'icon-favorites':
      return <IconFavorites {...rest} />;
    case 'icon-search':
      return <IconSearch {...rest} />;
    case 'icon-history':
      return <IconHistory {...rest} />;
    case 'icon-gift':
      return <IconGift {...rest} />;
    case 'icon-pic1':
      return <IconPic1 {...rest} />;
    case 'icon-QRcode':
      return <IconQRcode {...rest} />;
    case 'icon-discount':
      return <IconDiscount {...rest} />;
    case 'icon-editor1':
      return <IconEditor1 {...rest} />;
    case 'icon-ellipsis':
      return <IconEllipsis {...rest} />;
    case 'icon-link':
      return <IconLink {...rest} />;
    case 'icon-mobile-phone':
      return <IconMobilePhone {...rest} />;
    case 'icon-move':
      return <IconMove {...rest} />;
    case 'icon-namecard':
      return <IconNamecard {...rest} />;
    case 'icon-map':
      return <IconMap {...rest} />;
    case 'icon-prompt':
      return <IconPrompt {...rest} />;
    case 'icon-return':
      return <IconReturn {...rest} />;
    case 'icon-rmb':
      return <IconRmb {...rest} />;
    case 'icon-scanning':
      return <IconScanning {...rest} />;
    case 'icon-seleted':
      return <IconSeleted {...rest} />;
    case 'icon-sound-filling':
      return <IconSoundFilling {...rest} />;
    case 'icon-success':
      return <IconSuccess {...rest} />;
    case 'icon-unlock':
      return <IconUnlock {...rest} />;
    case 'icon-all':
      return <IconAll {...rest} />;
    case 'icon-editor':
      return <IconEditor {...rest} />;
    case 'icon-Notvisible':
      return <IconNotvisible {...rest} />;
    case 'icon-favorites-fill':
      return <IconFavoritesFill {...rest} />;
    case 'icon-arrow-right':
      return <IconArrowRight {...rest} />;
    case 'icon-arrow-lift':
      return <IconArrowLift {...rest} />;
    case 'icon-arrow-up':
      return <IconArrowUp {...rest} />;
    case 'icon-ashbin':
      return <IconAshbin {...rest} />;
    case 'icon-bad':
      return <IconBad {...rest} />;
    case 'icon-browse':
      return <IconBrowse {...rest} />;
    case 'icon-close':
      return <IconClose {...rest} />;
    case 'icon-double-arro-right':
      return <IconDoubleArroRight {...rest} />;
    case 'icon-double-arrow-left':
      return <IconDoubleArrowLeft {...rest} />;
    case 'icon-download':
      return <IconDownload {...rest} />;
    case 'icon-email':
      return <IconEmail {...rest} />;
    case 'icon-help':
      return <IconHelp {...rest} />;
    case 'icon-good':
      return <IconGood {...rest} />;
    case 'icon-hot':
      return <IconHot {...rest} />;
    case 'icon-password':
      return <IconPassword {...rest} />;
    case 'icon-pic':
      return <IconPic {...rest} />;
    case 'icon-remind':
      return <IconRemind {...rest} />;
    case 'icon-share':
      return <IconShare {...rest} />;
    case 'icon-upload':
      return <IconUpload {...rest} />;
    case 'icon-set':
      return <IconSet {...rest} />;
    case 'icon-exchangerate':
      return <IconExchangerate {...rest} />;
    case 'icon-bad-fill':
      return <IconBadFill {...rest} />;
    case 'icon-good-fill':
      return <IconGoodFill {...rest} />;
    case 'icon-hot-fill':
      return <IconHotFill {...rest} />;
    case 'icon-collection':
      return <IconCollection {...rest} />;
    case 'icon-collection-fill':
      return <IconCollectionFill {...rest} />;
    case 'icon-home':
      return <IconHome {...rest} />;
  }

  return null;
};

export default IconFont;
