export default function GuideSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-center">在线计算器使用指南</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">使用说明</h3>
              <p className="text-muted-foreground">
                我们的在线计算器工具完全免费，无需下载安装，打开网页即可使用。支持各种常用计算功能，界面简洁直观，操作便捷。适合学生、职场人士、工程技术人员等各类用户使用。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">计算器分类</h3>
              <p className="text-muted-foreground">
                网站提供多种专业计算器，包括贷款计算、健康指标、时间日期、数学科学、网络工具等多个类别。每种计算器都针对特定需求优化设计，确保计算结果的准确性和可靠性。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}