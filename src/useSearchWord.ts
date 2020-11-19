import { inject, provide, ref, Ref } from 'vue'

const StoreSymbol = Symbol()

export function provideStore(store: Ref<string>) {
  provide(StoreSymbol, store)
}

export function useStore() {
  const store = inject(StoreSymbol, ref(''))
  if (!store) {
    // 抛出错误，不提供store
  }

  return store
}