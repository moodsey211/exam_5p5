import ScrollToTop from '@components/ScrollToTop';

export default function InnerPageLayout(props: any) {
  const { children } = props;
  
  return (
    <div className="flex w-full min-h-screen dark:bg-darkgray">
      <div className="page-wrapper flex w-full">
        <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
          <div className="bg-lightgray dark:bg-dark h-full rounded-bb">
            <div className="w-full">
              <ScrollToTop>
                <div className="container py-30">
                {children}
                </div>
              </ScrollToTop>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}