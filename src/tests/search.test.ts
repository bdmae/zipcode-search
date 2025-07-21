import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchForm from '../components/SearchForm.vue'
import { validationErrorMessages } from '../types/errors'

describe('SearchForm.vue validation', () => {
  it('does not emit search if input is empty', async () => {
    const wrapper = mount(SearchForm)

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  it('shows error for invalid characters', async () => {
    const wrapper = mount(SearchForm)
    const input = wrapper.find('input')

    await input.setValue('１２３４５６７') // full-width digits (invalid characters)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(validationErrorMessages.invalidCharacters)
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  it('shows error for invalid format', async () => {
    const wrapper = mount(SearchForm)
    const input = wrapper.find('input')

    await input.setValue('123-456') // invalid length
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(validationErrorMessages.invalidFormat)
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  it('emits search for valid input', async () => {
    const wrapper = mount(SearchForm)
    const input = wrapper.find('input')

    await input.setValue('123-4567') // valid format
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('search')).toHaveLength(1)
    expect(wrapper.emitted('search')?.[0]).toEqual(['123-4567'])
  })
})
