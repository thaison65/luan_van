import * as React from 'react';
import { LayoutProps } from '~/models';

export interface EmptyProps {}

export function Empty({ children }: LayoutProps) {
	return <>{children}</>;
}
