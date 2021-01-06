/**
 * 查询当前登录人密码是否过期
 */
export const isExpired = {
  url: '/security/emp/isExpired'
}

/**
 * 重置密码
 */
export const resetPassword = {
  url: '/security/emp/resetPassword'
}

/**
 * 绑定手机
 * mobile=13810640961&validationCode=943872
 */
export const bindMobile = {
  url: '/security/emp/bindMobile'
}

/**
 * 发送验证码
 * mobile=13810640961
 */
export const sendvalidationCode = {
  url: '/security/emp/sendvalidationCode'
}
/**
 * 参与商机轮播的商务列表
 */
export const salersSortList = {
  url: '/security/sjcust/salersSortList'
}

/**
 * 未参与商机轮播的商务列表
 */
export const noSelectedSalersList = {
  url: '/security/sjcust/noSelectedSalersList'
}
/**
 * 批量选定商务
 */
export const chooseSaler = {
  url: '/security/sjcust/chooseSaler'
}

/**
 * 根据商务id删除
 */
export const deleteSaler = {
  url: '/security/sjcust/deleteSaler'
}

/**
 * 商务排序
 */
export const sortSalers = {
  url: '/security/sjcust/sortSalers'
}

/**
 * 查看客户ID或客户名称查看保护关系
 */
export const selectCustProtect = {
  url: '/security/operate/selectCustProtect'
}

/**
 * 修改客户阶段
 */
export const updateCustStage = {
  url: '/security/operate/updateCustStage'
}

/**
 *  设置中心-自动分配线索设置列表查询
 */
export const listAutoDistClue = {
  url: '/security/config/listAutoDistClue'
}
/**
 *  设置中心-自动分配线索设置列表查询
 */
export const getAutoDistClueSelect = {
  url: '/config/getAutoDistClueSelect'
}
/**
 *  设置中心-自动分配线索设置修改
 */
export const updateAutoDistClue = {
  url: '/security/config/updateAutoDistClue',
  method: 'POST'
}
/**
 *  设置中心-商务职级任务设置列表查询
 */
export const listJobgradeTask = {
  url: '/security/config/listJobgradeTask'
}
/**
 *  设置中心-商务职级任务设置下拉列表
 */
export const getJobgradeTaskSelect = {
  url: '/config/getJobgradeTaskSelect'
}
/**
 *  设置中心-商务职级任务设置添加
 */
export const saveJobgradeTask = {
  url: '/security/config/saveJobgradeTask',
  method: 'POST'
}
/**
 *   设置中心-商务职级任务设置修改
 */
export const updateJobgradeTask = {
  url: '/security/config/updateJobgradeTask',
  method: 'POST'
}
/**
 *   设置中心-商务职级任务设置删除
 */
export const deleteJobgradeTask = {
  url: '/security/config/deleteJobgradeTask',
  method: 'POST'
}

/**
 * 分页查询挑战任务
 */
export const getChallengeTaskPage = {
  url: '/security/hierarchicalOperation/getChallengeTaskPage'
}
/**
 * 保存挑战任务
 */
export const saveChallengeTask = {
  url: '/security/hierarchicalOperation/saveChallengeTask'
}
/**
 * 获取当前商务月和下个商务月
 */
export const getSalerMonthAndNextMonth = {
  url: '/security/pullAchievement/getSalerMonthAndNextMonth'
}
/**
 * 获取基本任务
 */
export const getBaseTask = {
  url: '/security/hierarchicalOperation/getBaseTask'
}

/**
 *
 */
export const getHaveReserveMonths = {
  url: '/security/hierarchicalOperation/getHaveReserveMonths'
}

/**
 *
 */
export const getSalerMonthsSet = {
  url: '/security/hierarchicalOperation/getSalerMonthsSet'
}

/**
 * 设置值列表
 */
export const getSetList = {
  url: '/security/cluerule/getSetList'
}
/**
 * 默认值列表
 */
export const getDefaultList = {
  url: '/security/cluerule/getDefaultList'
}
/**
 * 设置保存
 */
export const cluerulesave = {
  url: '/security/cluerule/save'
}
export const getBusinessDepts = {
  url: '/security/visitlog/getBusinessDepts'
}
export const saveReturnVisitConfig = {
  url: '/security/visitlog/saveReturnVisitConfig'
}
export const getDeptReturnVisitConfig = {
  url: '/security/visitlog/getDeptReturnVisitConfig'
}
export const getCompetitors = {
  url: '/security/gj/competitor/getCompetitors'
}
export const getTypes = {
  url: '/security/gj/competitor/getTypes'
}
export const getStatusList = {
  url: '/security/gj/competitor/getStatusList'
}
export const saveCompetitor = {
  url: '/security/gj/competitor/saveCompetitor'
}
export const updateCompetitor = {
  url: '/security/gj/competitor/updateCompetitor'
}
export const getVerifyStatusList = {
  url: '/security/gj/competitor/getVerifyStatusList'
}
export const getCompetitorInformations = {
  url: '/security/gj/competitor/getCompetitorInformations'
}
export const saveCompetitorInformation = {
  url: '/security/gj/competitor/saveCompetitorInformation'
}
export const updateCompetitorInformation = {
  url: '/security/gj/competitor/updateCompetitorInformation'
}
export const deleteCompetitorInformation = {
  url: '/security/gj/competitor/deleteCompetitorInformation'
}
export const findSubsListConfCluePool = {
  url: '/security/cluerule/findSubsListConfCluePool'
}

///开启或关闭线索池捞取权限
export const openOrCloseCluePool = {
  url: '/security/cluerule/openOrCloseCluePool'
}

//是否总部角色
export const settingZbRole = {
  url: '/security/rbac/settingZbRole'
}

//总部角色列表
export const roleList = {
  url: '/security/rbac/roleList'
}



//区总调拨配额
export const rdTransferQuotaConfigure = {
  url: '/security/cluerule/rdTransferQuotaConfigure'
}
//设置区总调拨配额
export const settingTransferQuotaConfigure = {
  url: '/security/cluerule/settingTransferQuotaConfigure'
}


//可吐槽的产品列表
export const getAllProductTucaoConfigs = {
  url: '/security/productTucao/getAllProductTucaoConfigs'
}


//设置可以吐槽的产品
export const configProductTucao = {
  url: '/security/productTucao/configProductTucao'
}


//查询不流失产品列表
export const findNotProductList = {
  url: '/security/willlose/findNotProductList'
}

//添加不流失产品
export const saveNotProduct = {
  url: '/security/willlose/saveNotProduct',
  method: 'post'
}

//删除不流失产品
export const deleteNotProduct = {
  url: '/security/willlose/deleteNotProduct'
}
//app banner 管理 列表
export const getAppBannerMgList = {
  url: '/security/appbanner/getSmaAppBannerList'
}
//app banner 管理 列表--弹窗--添加
export const getAppBannerMgListAdd = {
  url: '/security/appbanner/save',
  method: 'POST'
}
//app banner 管理 列表--弹窗--编辑
export const getAppBannerMgListEdit = {
  url: '/security/appbanner/edit',
  method: 'POST'
}
//app banner 管理 列表--删除
export const getAppBannerMgListDelById = {
  url: '/security/appbanner/delete',
  method: 'POST'
}
//app 模块名称
export const APP_BANNER_CATEGORY = {
  url: '/items/APP_BANNER_CATEGORY',
}
//意向手机号黑名单-黑名单列表
export const phoneBlackList = {
  url: '/security/intentionMobileBlacklist/list',
}
//意向手机号黑名单-添加手机号
export const addPhoneBlackList = {
  url: '/security/intentionMobileBlacklist/addMobile',
}
//意向手机号黑名单-删除手机号
export const delPhoneBlackList = {
  url: '/security/intentionMobileBlacklist/deleteMobile',
}
//客户手机号白名单-白名单列表
export const phoneWhiteList = {
  url: '/security/custMobileWhiteList/list',
}
//客户手机号白名单-添加手机号
export const addPhoneWhiteList = {
  url: '/security/custMobileWhiteList/addMobile',
}
//客户手机号白名单-删除手机号
export const delPhoneWhiteList = {
  url: '/security/custMobileWhiteList/deleteMobile',
}



/**
 * 文档地址：http://10.12.52.224:3000/project/59/interface/api/1012
 * 生成日期：Tue Dec 08 2020 10:40:17 GMT+0800 (中国标准时间)
 * 生成工具版本：v0.0.1
 * 接口名称：黑名单-类型换成字典表获取-潘昭
 * 请求参数：

 */

export const securityIntentionMobileBlacklistGetBlacklistTypes = {
  url: '/security/intentionMobileBlacklist/getBlacklistTypes',
  method: 'GET'
}

