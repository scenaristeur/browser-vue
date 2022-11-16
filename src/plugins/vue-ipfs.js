// import { create } from 'ipfs-core'

import * as IPFS from 'ipfs-core'

console.log(IPFS)


export default {
  install: (app, options) => {
    let store = options.store
    let ipfs


    app.config.globalProperties.$initIpfs = async function(){
      // IPFS = window.IpfsCore;
      // ipfs = await IPFS.create()
      ipfs = app.config.globalProperties.$ipfs = await IPFS.create(options)
      let id = await ipfs.id()
      console.log(ipfs,id )
      store.commit('core/setIpfsNode',id)
    }

    app.config.globalProperties.$getFolder = async function(path= '/'){
      let folder = {}
      folder = await ipfs.files.stat(path)
      store.commit('ipfs/setFolder',folder)
    }




  }
}
