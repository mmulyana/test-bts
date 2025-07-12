'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/use-login'
import { useRegister } from '../hooks/use-register'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { CookieKeys } from '@/lib/http'

export default function FormLoginRegister({
	variant,
}: {
	variant: 'register' | 'login'
}) {
	const { mutate: loginMutate } = useLogin()
	const { mutate: registerMutate } = useRegister()
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	})

	const isLogin = variant === 'login'

	const onSubmit = (data: any) => {
		if (isLogin) {
			loginMutate(data, {
				onSuccess: (data) => {
					const token = data.data.data.token
					if (token) {
						Cookies.set(CookieKeys.AuthToken, token, {
							expires: 1,
							secure: process.env.NODE_ENV === 'production',
							sameSite: 'Strict',
						})
					}
					router.push('/home')
				},
			})
			return
		}
		registerMutate(data, {
			onSuccess: () => {
				router.push('/login')
			},
		})
	}

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{!isLogin && (
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Email' />
										</FormControl>
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Username' />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} placeholder='password' />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button>{isLogin ? 'Login' : 'Register'}</Button>
					</form>
				</Form>
				<p className='text-center'>
					{isLogin ? 'Dont have an account' : 'Already have an account'} ?{' '}
					<Link href={isLogin ? '/register' : '/login'}>
						{isLogin ? 'Register here' : 'Login here'}
					</Link>
				</p>
			</CardContent>
		</Card>
	)
}
