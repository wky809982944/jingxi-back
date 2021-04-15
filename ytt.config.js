import { defineConfig } from 'yapi-to-typescript'

export default defineConfig([
  {
    serverUrl: 'http://yapi.wangkaiyi.com',
    typesOnly: false,
    target: 'javascript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'local',
    outputFilePath: 'src/api/index.js',
    requestFunctionFilePath: 'src/utils/request.js',
    dataKey: 'data',
    projects: [
      {
        token: 'd401cf658f531cfe26e4a26e86c6e90ef598a3a3b880d1654f0aa031cea7ef5b',
        categories: [
          {
            id: 398,
            getRequestFunctionName(interfaceInfo, changeCase) {
              return changeCase.camelCase(
                interfaceInfo.parsedPath.name,
              )
            },
          },
        ],
      },
    ],
  },
])
