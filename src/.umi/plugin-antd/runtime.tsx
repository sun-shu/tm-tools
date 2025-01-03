// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
import {
  ConfigProvider,
  App,
} from 'antd';
import { ApplyPluginsType } from 'umi';
import { getPluginManager } from '../core/plugin';
import { AntdConfigContext, AntdConfigContextSetter } from './context';
import merge from '/Users/a1234/Learn/tm-tools/node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge'

let cacheAntdConfig = null;

const getAntdConfig = () => {
  if(!cacheAntdConfig){
    cacheAntdConfig = getPluginManager().applyPlugins({
      key: 'antd',
      type: ApplyPluginsType.modify,
      initialValue: {
        ...{"theme":{"colorPrimary":"#00ADB8","token":{"colorPrimary":"#00ADB8"},"components":{"Button":{"colorPrimary":"#00ADB8","borderRadius":4}}}},
        appConfig: {},
      },
    });
  }
  return cacheAntdConfig;
}

function AntdProvider({ children }) {
  let container = children;

  const [antdConfig, _setAntdConfig] = React.useState(() => {
    const {
      appConfig: _,
      ...finalConfigProvider
    } = getAntdConfig();
    return finalConfigProvider
  });
  const setAntdConfig: typeof _setAntdConfig = (newConfig) => {
    _setAntdConfig(prev => {
      return merge({}, prev, typeof newConfig === 'function' ? newConfig(prev) : newConfig)
    })
  }


  if (antdConfig.prefixCls) {
    ConfigProvider.config({
      prefixCls: antdConfig.prefixCls,
    });
  };

  if (antdConfig.iconPrefixCls) {
    // Icons in message need to set iconPrefixCls via ConfigProvider.config()
    ConfigProvider.config({
      iconPrefixCls: antdConfig.iconPrefixCls,
    });
  };

  if (antdConfig.theme) {
    // Pass config theme to static method
    ConfigProvider.config({
      theme: antdConfig.theme,
    });
  }

  container = <ConfigProvider {...antdConfig}>{container}</ConfigProvider>;


  container = (
    <AntdConfigContextSetter.Provider value={setAntdConfig}>
      <AntdConfigContext.Provider value={antdConfig}>
        {container}
      </AntdConfigContext.Provider>
    </AntdConfigContextSetter.Provider>
  )

  return container;
}

export function rootContainer(children) {
  return (
    <AntdProvider>
      {children}
    </AntdProvider>
  );
}

// The App component should be under ConfigProvider
// plugin-locale has other ConfigProvider
export function innerProvider(container: any) {
  const {
    appConfig: finalAppConfig = {},
  } = getAntdConfig();
  return <App {...finalAppConfig}>{container}</App>;
}
