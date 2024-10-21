export default defineNuxtRouteMiddleware((to, from) => {
  const error = to.query.error;
  if (!error) {
    return;
  }

  const { t } = useNuxtApp().$i18n;
  const toast = useToast();

  toast.add({
    id: "error",
    title: t(error.toString()),
    color: "red",
  });

  const newQuery = { ...to.query };
  delete newQuery.error;

  setTimeout(() => {
    navigateTo({ path: to.path, query: newQuery });
  }, 0);
});
