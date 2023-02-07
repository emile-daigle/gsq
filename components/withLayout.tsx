import MainLayout from "./MainLayout";

export default function withLayout() {
  return function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
  };
}