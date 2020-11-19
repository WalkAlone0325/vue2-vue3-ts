import { inject, provide, ref } from 'vue'

const StoreSymbol = Symbol()

export function provideStore(store) {
  provide(StoreSymbol, store)
}

export function useStore() {
  const store = inject(StoreSymbol, ref(''))
  if (!store) {
    // 抛出错误，不提供store
  }

  return store
}
