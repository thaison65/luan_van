import React, { useState, ChangeEvent, MouseEvent, useRef } from 'react';
import Link from 'next/link';

import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useRouter } from 'next/router';
import { theme } from '~/utils';

export interface FormValues {
	phone: string;
	password: string;
}

export interface LoginPageProps {}

export interface RecoverPageProps {}

function RecoverPage({}: RecoverPageProps) {
	const [phone, setPhone] = useState<string>('');

	const handleChangePhone = (event: ChangeEvent<{ value: unknown }>) => {
		setPhone(event.target.value as string);
	};

	async function handleClickRecover() {
		try {
		} catch (error) {
			console.log('failed to login', error);
		}
	}

	return (
		<Box bgcolor={theme.palette.primary.main}>
			<Link href={'/login'}>
				<Button
					startIcon={<ArrowBackIcon />}
					sx={{ color: '#ffffff', fontSize: 16, margin: 1 }}
				>
					Quay lại đăng nhập
				</Button>
			</Link>
			<Stack
				minHeight={'100vh'}
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<form
					method="POST"
					onSubmit={handleClickRecover}
				>
					<Stack
						component={Paper}
						elevation={4}
						direction={'column'}
						alignItems={'center'}
						justifyContent={'center'}
						minWidth={'30vw'}
						spacing={2}
						padding={4}
						borderRadius={4}
					>
						<Typography
							variant="h4"
							component={'h1'}
							fontWeight={500}
							color={'#7f7f7f'}
						>
							Lấy lại mật khẩu
						</Typography>

						<Stack
							spacing={2}
							width={'100%'}
						>
							<TextField
								fullWidth
								label={'Số điện thoại'}
								id="txt_phone"
								name="phone"
								onChange={handleChangePhone}
							/>

							<Button
								variant="contained"
								sx={{ paddingX: 2 }}
								type="submit"
							>
								Lấy mã OPT
							</Button>
						</Stack>
					</Stack>
				</form>
			</Stack>
		</Box>
	);
}

export default RecoverPage;
