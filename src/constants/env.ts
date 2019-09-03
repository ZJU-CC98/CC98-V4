// 修改时package.json中的脚本也要改
enum CC98_ENV_TYPE {
  // 内网环境
  INTRANET = 'intranet',
  // 内网测试环境
  INTRANET_TEST = 'intranet_test',
  // 本地环境
  LOCAL = 'local',
  // 公网环境
  PUBLIC = 'public',
}

export default CC98_ENV_TYPE
