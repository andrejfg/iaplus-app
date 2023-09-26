import { create, useDeviceContext } from 'twrnc'
import TailwindConfig from '../../tailwind.config.js'

// create the customized version...

const tw = create(TailwindConfig) // <- your path may differ

// ... and then this becomes the main function your app uses
export default tw
