import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Burn} from './model'
import {processor} from './processor'
import * as erc721 from './abi/erc721'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    for (let block of ctx.blocks) {
        const contract = new erc721.Contract(ctx, block.header, '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') // BAYC
        const owner = await contract.ownerOf(10)
        console.log(`BAYC #10 is owned by ${owner} at block ${block.header.height}`)
        break
    }
})
