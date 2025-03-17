export default function requirePlugin() {
    return {
      // 插件名称
      name: "vite-plugin-vue-requireToUrlPlugin",
  
      // 默认值post：在 Vite 核心插件之后调用该插件，pre：在 Vite 核心插件之前调用该插件
      // enforce: "post",
  
      // 代码转译，这个函数的功能类似于 "webpack" 的 "loader"
      transform(code, id, opt) {
        const vueRE = /\.vue$/;
        const require = /require/g;
        
        // 过滤掉非目标文件
        if (!vueRE.test(id) || !require.test(code)) return code;
  
        // 匹配 require() 内的内容
        const requireRegex = /require\((.*?)\)/g;
  
        // 将 require() 内的内容替换为 new URL 的写法
        const finalCode = code.replace(requireRegex, "new URL($1,import.meta.url).href");
          
        // 将转换后的代码返回
        return finalCode;
      },
    };
  }
  