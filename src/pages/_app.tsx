import { type AppType } from "next/app"
import { trpc } from "~/lib/trpc"
import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import "~/styles/globals.css"

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter'
})

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<main className={cn(inter.variable, 'font-sans antialiased')}>
			<Component {...pageProps} />
		</main>
	)
};

export default trpc.withTRPC(MyApp);
