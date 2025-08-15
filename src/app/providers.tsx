import { ThemeProviderWrapper } from '@/components/theme-provider'
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "@/context/cart-context"
import { SessionProvider } from '@/components/session-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import queryClient from './query-client';
export default async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <CartProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </CartProvider>
        </SessionProvider>
      </ThemeProviderWrapper>
    </QueryClientProvider>
  )
}