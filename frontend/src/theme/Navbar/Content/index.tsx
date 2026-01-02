import React from 'react';
import OriginalNavbarContent from '@theme-original/Navbar/Content';
import type NavbarContentType from '@theme/Navbar/Content';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarContentType>;

export default function NavbarContentWrapper(props: Props): JSX.Element {
  return <OriginalNavbarContent {...props} />;
}
