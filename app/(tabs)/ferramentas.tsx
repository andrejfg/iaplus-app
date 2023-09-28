import EmDesenvolvimento from '@/components/EmDesenvolvimento'
import tw from '@/lib/tailwind'
import { useDeviceContext } from 'twrnc'

export default function FerramentasScreen() {
  useDeviceContext(tw)
  return <EmDesenvolvimento />
}
