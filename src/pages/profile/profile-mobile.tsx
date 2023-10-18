import React from 'react';

import { Box } from '@mui/material';

export interface ProfileMobileProps {}

function ProfileMobile({}: ProfileMobileProps) {
	return <Box display={{ xs: 'flex', lg: 'none' }}>ProfileMobile</Box>;
}

export default ProfileMobile;
