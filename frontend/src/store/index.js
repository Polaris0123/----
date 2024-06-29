import {createStore} from "vuex"
//createStore创建store实例
export default createStore({
	  //state则是保存一些数据的
		state:{
		menu:[],
        isCollapse:false,
        currentMenu:null,
        tabList:[
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "home"
            }
        
    ]
		},
		//mutations则是一些修改state的方法，这里我们定义了一个修改menu的方法，在登录后调用，设置menu的值
		mutations:{
  			setMenu(state, val) {
                state.menu = val
               
              },
              updateIsCollapse(state,value){
                state.isCollapse=value
            },
            selectMenu(state,value){
                if(value.path=="/home"||value.path=="home"){
                    state.currentMenu=null
                }else{
                    state.currentMenu=value
                     //为tablist添加一个路由对象
                    state.tabList.findIndex(item=>
                        item.name==value.name )==-1?state.tabList.push(value):''

                }
            },
       //定义deleteMenu方法
            deleteMenu(state,value){
                //从
                let index=state.tabList.findIndex(item=>
                    item.name==value.name)
                    state.tabList.splice(index,1)
            },
        },
        
})
