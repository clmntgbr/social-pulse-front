export default defineNuxtRouteMiddleware((to, from) => {
  const success = to.query.success;
  if (!success) {
    return;
  }

  const { t } = useNuxtApp().$i18n;
  const toast = useToast();

  toast.add({
    id: "success",
    title: t(success.toString()),
    color: "green",
  });

  const newQuery = { ...to.query };
  delete newQuery.success;

  setTimeout(() => {
    navigateTo({ path: to.path, query: newQuery }, { replace: true });
  }, 0);
});
