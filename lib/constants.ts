import { type LucideIcon } from 'lucide-react';

export interface CalculatorItem {
  name: string;
  url: string;
  description?: string;
  iconName: string;
}

export interface CategoryType {
  title: string;
  iconName: string;
  description: string;
  href: string;
  items: CalculatorItem[];
}

export const categories: CategoryType[] = [
  {
    iconName: 'Wallet',
    title: '贷款与财务',
    description: '房贷、车贷、个税等财务计算工具',
    href: '/jsq/fangdai',
    items: [
      { name: '房贷计算器', url: 'fangdai', description: '房贷月供计算与本息分析', iconName: 'Home' },
      { name: '商业贷款计算器', url: 'shangye-daikuan', description: '商业贷款利息计算', iconName: 'Building' },
      { name: '车贷计算器', url: 'chedai', description: '汽车贷款月供计算', iconName: 'Car' },
      { name: '公积金贷款计算器', url: 'gongjijin', description: '公积金贷款计算', iconName: 'Landmark' },
      { name: '个人所得税计算器', url: 'geshui', description: '个税计算与分析', iconName: 'Receipt' },
      { name: '税后工资计算器', url: 'shuihou-gongzi', description: '工资税后金额计算', iconName: 'Wallet' },
      { name: '五险一金计算器', url: 'shebao', description: '社保公积金计算', iconName: 'Shield' },
      { name: '存款计算器', url: 'cunkuan', description: '存款利息计算', iconName: 'PiggyBank' },
      { name: '车辆购置税计算器', url: 'cheliang-gouzhishui', description: '车辆购置税计算', iconName: 'CarTaxiFront' }
    ]
  },
  {
    iconName: 'Heart',
    title: '健康与生育',
    description: '身体健康指标和孕期相关计算',
    href: '/jsq/bmi',
    items: [
      { name: 'BMI计算器', url: 'bmi', description: '身体质量指数计算', iconName: 'Weight' },
      { name: '胎儿体重计算器', url: 'taier-tizhong', description: '胎儿体重估算', iconName: 'Baby' },
      { name: '预产期计算器', url: 'yuchanqi', description: '预产期计算', iconName: 'Calendar' },
      { name: '排卵期计算器', url: 'pailvqi', description: '排卵期预测', iconName: 'CalendarCheck' },
      { name: '月经计算器', url: 'yuejing', description: '月经周期计算', iconName: 'CalendarDays' },
      { name: '安全期计算器', url: 'anquanqi', description: '安全期计算', iconName: 'CalendarHeart' }
    ]
  },
  {
    iconName: 'Clock',
    title: '时间与日期',
    description: '日期间隔、年龄等时间计算',
    href: '/jsq/riqi',
    items: [
      { name: '日期计算器', url: 'riqi', description: '日期间隔计算', iconName: 'Calendar' },
      { name: '时间计算器', url: 'shijian', description: '时间差计算', iconName: 'Timer' },
      { name: '年龄计算器', url: 'nianling', description: '精确年龄计算', iconName: 'Clock' }
    ]
  },
  {
    iconName: 'Functions',
    title: '数学与科学',
    description: '科学计算、方程式、函数运算',
    href: '/jsq/kexue',
    items: [
      { name: '科学计算器', url: 'kexue', description: '科学计算功能', iconName: 'Calculator' },
      { name: '解方程计算器', url: 'jiefangcheng', description: '方程求解', iconName: 'Equal' },
      { name: '三角函数计算器', url: 'sanjiaohanshu', description: '三角函数计算', iconName: 'Triangle' },
      { name: '开根号计算器', url: 'kaigenghao', description: '开方计算', iconName: 'Square' },
      { name: '十六进制计算器', url: 'shiliujinzhi', description: '进制转换计算', iconName: 'Binary' },
      { name: '对数计算器', url: 'duishu', description: '对数运算', iconName: 'LineChart' },
      { name: '方差计算器', url: 'fangcha', description: '方差标准差计算', iconName: 'BarChart' },
      { name: '阶乘计算器', url: 'jiecheng', description: '阶乘计算', iconName: 'Sigma' },
      { name: '行列式计算器', url: 'hanglieshi', description: '行列式计算', iconName: 'Grid' }
    ]
  },
  {
    iconName: 'Network',
    title: '网络与单位换算',
    description: '网络参数和单位转换工具',
    href: '/jsq/danwei-huansuan',
    items: [
      { name: '子网掩码计算器', url: 'ziwang-yanma', description: 'IP地址计算', iconName: 'Network' },
      { name: '单位换算计算器', url: 'danwei-huansuan', description: '常用单位换算', iconName: 'ArrowLeftRight' },
      { name: '电源功率计算器', url: 'dianyuan-gonglv', description: '电源功率计算', iconName: 'Zap' }
    ]
  },
  {
    iconName: 'MoreHorizontal',
    title: '其他工具',
    description: '实用生活工具集合',
    href: '/jsq/qinqi-chenghu',
    items: [
      { name: '亲戚称呼计算器', url: 'qinqi-chenghu', description: '亲戚关系计算', iconName: 'Users' },
      { name: '数独计算器', url: 'shudou', description: '数独题目求解', iconName: 'Grid3x3' }
    ]
  }
];