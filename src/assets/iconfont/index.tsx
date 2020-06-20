/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconQRcode from './IconQRcode';
import Iconattachent from './Iconattachent';
import IconfavoritesFill from './IconfavoritesFill';
import IconarrowRight from './IconarrowRight';
import IconarrowLift from './IconarrowLift';
import IconarrowUp from './IconarrowUp';
import Iconashbin from './Iconashbin';
import Iconbad from './Iconbad';
import Iconbrowse from './Iconbrowse';
import Iconclose from './Iconclose';
import IcondoubleArroRight from './IcondoubleArroRight';
import IcondoubleArrowLeft from './IcondoubleArrowLeft';
import Icondownload from './Icondownload';
import Iconemail from './Iconemail';
import Iconhelp from './Iconhelp';
import Icongood from './Icongood';
import Iconhot from './Iconhot';
import Iconpassword from './Iconpassword';
import Iconpic from './Iconpic';
import Iconremind from './Iconremind';
import Iconshare from './Iconshare';
import Iconupload from './Iconupload';
import Iconset from './Iconset';
import Iconexchangerate from './Iconexchangerate';
import IconbadFill from './IconbadFill';
import IcongoodFill from './IcongoodFill';
import IconhotFill from './IconhotFill';
import Iconcollection from './Iconcollection';
import IconcollectionFill from './IconcollectionFill';
import Iconhome from './Iconhome';
import IconaccountFill from './IconaccountFill';
import IconhomeFill from './IconhomeFill';
import IconaddSelect from './IconaddSelect';
import IconsamiSelect from './IconsamiSelect';
import Iconcamera from './Iconcamera';
import IconarrowDown from './IconarrowDown';
import Iconaccount from './Iconaccount';
import Iconcomments from './Iconcomments';
import IconcartEmpty from './IconcartEmpty';
import Iconfavorites from './Iconfavorites';
import Iconsearch from './Iconsearch';
import Iconall from './Iconall';
import Iconeditor from './Iconeditor';
import IconNotvisible from './IconNotvisible';

export type IconNames = 'iconQRcode' | 'iconattachent' | 'iconfavorites-fill' | 'iconarrow-right' | 'iconarrow-lift' | 'iconarrow-up' | 'iconashbin' | 'iconbad' | 'iconbrowse' | 'iconclose' | 'icondouble-arro-right' | 'icondouble-arrow-left' | 'icondownload' | 'iconemail' | 'iconhelp' | 'icongood' | 'iconhot' | 'iconpassword' | 'iconpic' | 'iconremind' | 'iconshare' | 'iconupload' | 'iconset' | 'iconexchangerate' | 'iconbad-fill' | 'icongood-fill' | 'iconhot-fill' | 'iconcollection' | 'iconcollection-fill' | 'iconhome' | 'iconaccount-fill' | 'iconhome-fill' | 'iconadd-select' | 'iconsami-select' | 'iconcamera' | 'iconarrow-down' | 'iconaccount' | 'iconcomments' | 'iconcart-Empty' | 'iconfavorites' | 'iconsearch' | 'iconall' | 'iconeditor' | 'iconNotvisible';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconQRcode':
      return <IconQRcode {...rest} />;
    case 'iconattachent':
      return <Iconattachent {...rest} />;
    case 'iconfavorites-fill':
      return <IconfavoritesFill {...rest} />;
    case 'iconarrow-right':
      return <IconarrowRight {...rest} />;
    case 'iconarrow-lift':
      return <IconarrowLift {...rest} />;
    case 'iconarrow-up':
      return <IconarrowUp {...rest} />;
    case 'iconashbin':
      return <Iconashbin {...rest} />;
    case 'iconbad':
      return <Iconbad {...rest} />;
    case 'iconbrowse':
      return <Iconbrowse {...rest} />;
    case 'iconclose':
      return <Iconclose {...rest} />;
    case 'icondouble-arro-right':
      return <IcondoubleArroRight {...rest} />;
    case 'icondouble-arrow-left':
      return <IcondoubleArrowLeft {...rest} />;
    case 'icondownload':
      return <Icondownload {...rest} />;
    case 'iconemail':
      return <Iconemail {...rest} />;
    case 'iconhelp':
      return <Iconhelp {...rest} />;
    case 'icongood':
      return <Icongood {...rest} />;
    case 'iconhot':
      return <Iconhot {...rest} />;
    case 'iconpassword':
      return <Iconpassword {...rest} />;
    case 'iconpic':
      return <Iconpic {...rest} />;
    case 'iconremind':
      return <Iconremind {...rest} />;
    case 'iconshare':
      return <Iconshare {...rest} />;
    case 'iconupload':
      return <Iconupload {...rest} />;
    case 'iconset':
      return <Iconset {...rest} />;
    case 'iconexchangerate':
      return <Iconexchangerate {...rest} />;
    case 'iconbad-fill':
      return <IconbadFill {...rest} />;
    case 'icongood-fill':
      return <IcongoodFill {...rest} />;
    case 'iconhot-fill':
      return <IconhotFill {...rest} />;
    case 'iconcollection':
      return <Iconcollection {...rest} />;
    case 'iconcollection-fill':
      return <IconcollectionFill {...rest} />;
    case 'iconhome':
      return <Iconhome {...rest} />;
    case 'iconaccount-fill':
      return <IconaccountFill {...rest} />;
    case 'iconhome-fill':
      return <IconhomeFill {...rest} />;
    case 'iconadd-select':
      return <IconaddSelect {...rest} />;
    case 'iconsami-select':
      return <IconsamiSelect {...rest} />;
    case 'iconcamera':
      return <Iconcamera {...rest} />;
    case 'iconarrow-down':
      return <IconarrowDown {...rest} />;
    case 'iconaccount':
      return <Iconaccount {...rest} />;
    case 'iconcomments':
      return <Iconcomments {...rest} />;
    case 'iconcart-Empty':
      return <IconcartEmpty {...rest} />;
    case 'iconfavorites':
      return <Iconfavorites {...rest} />;
    case 'iconsearch':
      return <Iconsearch {...rest} />;
    case 'iconall':
      return <Iconall {...rest} />;
    case 'iconeditor':
      return <Iconeditor {...rest} />;
    case 'iconNotvisible':
      return <IconNotvisible {...rest} />;
  }

  return null;
};

export default IconFont;
