export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} 在线计算器. 保留所有权利</p>
          <p className="mt-2">
            本站提供的计算结果仅供参考，不作为任何商业或法律依据
          </p>
        </div>
      </div>
    </footer>
  );
}