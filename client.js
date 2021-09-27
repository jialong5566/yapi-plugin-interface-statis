import InterfaceStatis from './InterfaceStatis';

module.exports = function(){
  this.bindHook('interface_tab', function(tabs){
    tabs.interfaceStatis = {
      name: '接口访问统计',
      component: InterfaceStatis
    }
  });
}