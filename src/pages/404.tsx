import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";

export default function FourOFour() {
  return (
    <>
      <Header title={`404`} />
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="404 - Page Not Found" />
        <div className="404Div transition-all">
          <main className="flex flex-1 mt-[4rem] flex-col items-center text-center">
            <p className="FourOFour">404!</p>
          </main>
        </div>
      </div>
    </>
  );
}
