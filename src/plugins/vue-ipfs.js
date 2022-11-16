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
      try {
        ipfs = app.config.globalProperties.$ipfs = await IPFS.create(options)
        let id = await ipfs.id()
        console.log(ipfs,id)
        store.commit('ipfs/setStatus', "Connected to IPFS =)")
        store.commit('ipfs/setOnline', ipfs.isOnline())
        store.commit('ipfs/setIpfsNode',id)
      } catch (err) {
        // Set error status text.
        store.commit('ipfs/setStatut', `Error: ${err}`)
      }
    }

    //MFS, Mutable File System https://proto.school/mutable-file-system/02


    app.config.globalProperties.$get = async function(path= '/'){
      let current = await ipfs.files.stat(path)
      current._path = path
      store.commit('ipfs/setCurrent',current)
    }




  }
}
