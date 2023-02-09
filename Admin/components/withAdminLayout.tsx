import AdminLayout from "./AdminLayout";

export default function withAdminLayout() {
    return function getLayout(page: React.ReactElement) {
      return <AdminLayout>{page}</AdminLayout>;
    };
  }