import React from 'react'
import {memo} from 'react'
import {withMixins} from './mixins';
const A =memo((props)=>{
   console.log(props)
   return <div>A</div>
})

export default withMixins(A)