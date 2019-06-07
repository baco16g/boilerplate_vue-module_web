Array.prototype.forEach.call(
  document.querySelectorAll('[data-vue-module]'),
  (element: HTMLElement) => {
    const keys: string[] = element.getAttribute('data-vue-module')!.split(/\s+/);
    const opts: string | null = element.getAttribute('data-options') || null;

    keys.forEach(key => {
      import(`./${key.charAt(0).toUpperCase() + key.slice(1)}`).then(module => {
        const options: object = opts
          ? keys.length > 1
            ? JSON.parse(opts)[key]
            : JSON.parse(opts)
          : {};

        if (module !== undefined) return new module.default(`[data-vue-module="${key}"]`, options);
      });
    });
  }
);
