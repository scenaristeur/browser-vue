// import { create } from 'ipfs-core'

import * as IPFS from 'ipfs-core'
import all from 'it-all'

console.log(IPFS)


export default {
  install: (app, options) => {
    let store = options.store
    if (typeof window !== "undefined") window.global = window;

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
      await ls(current._path)
    }





    app.config.globalProperties.$upload = async function(files){
      let folder = store.state.ipfs.current
      console.log(folder)
      let opts = {
        truncate: true,
        create: true,
        flush: true
      }

      let actualPath = folder._path.endsWith('/') == true ? folder._path : folder._path+'/'
      // console.log(global)
      await Promise.all(Array.from(files).map(f => ipfs.files.write(actualPath + f.name, f, opts)))

      // for await (let file of files) {
      //   console.log(file)
      //   await ipfs.files.write(folder._path + file.name, file, opts, (err) => {
      //     console.log(err)
      //   })
      //
      //
      //   // Your code to add one file to MFS goes here
      //   // await ipfs.files.write('/' + file.name, file, opts, (err) => {
      //   //   console.log(err)
      //   // })
      // }

      // const result = []
      //
      // for await (const resultPart of ipfs.files.ls(folder._path)) {
      //   result.push(resultPart)
      // }
      // console.log(result)
      await ls(folder._path)

    }

    async function ls(path){
      let result = await all(ipfs.files.ls(path))
      console.log(result)
      store.commit('ipfs/setCurrentContent',result)
      return result
    }



    app.config.globalProperties.$upload1 = async function(files){
      const result = []
      let f_array = Array.from(files).map((x) => ({path: x.name, content: x, type: x.type}))
      console.log(f_array)
      for await (const resultPart of ipfs.addAll(f_array, { wrapWithDirectory: true })) {
        result.push(resultPart)
      }
      console.log(result)
      store.commit('ipfs/setResult',result)
      return result
    }

    app.config.globalProperties.$mkdir = async function(path){
      await ipfs.files.mkdir(path, { parents: true })
      await this.$get(path)
    }


  }
}
