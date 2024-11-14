---
outline: deep
---

# Schema Form通用类型

## 通用的Props类型 - `SchemaFormCommonProps`
通用的`SchemaFormCommonProps`类型继承自`Naive UI`的`n-form`组件的`Props`类型，既保留了`n-form`的核心功能，又扩展了一些实用的新特性。
```typescript
export interface SchemaFormCommonProps extends Partial<Omit<FormSetupProps, 'onSubmit'>> {
    // 表单类名
    formClass?: string

    // 表单样式
    formStyle?: Partial<CSSStyleDeclaration>

    // 模型
    model: Recordable

    // grid item组件属性
    gridItemProps?: number | GridItemProps

    // grid组件属性
    gridProps?: GridProps

    // 是否隐藏操作按钮
    hideActionButton?: boolean

    // 默认日期组件格式
    defaultDateFormat?: DateFormat

    // 默认时间组件格式
    defaultTimeFormat?: DateFormat

    // 默认日期组件值格式
    defaultDateValueFormat?: DateFormat

    // 默认时间组件值格式
    defaultTimeValueFormat?: DateFormat

    // 校验失败时自动滚动到对应的字段
    autoScrollToFailField?: boolean

    // 自动placeholder (item的label的类型为string才会生效，优先级最低)
    autoPlaceholder?: boolean

    // 自动规则校验 (当required为真的时候，会根据label自动生成校验提示信息,label的类型为string才会生效，优先级最低)
    autoRules?: boolean

    // 自动标签宽度 (优先级最低)
    autoLabelWidth?: boolean

    // 提交Loading
    submitLoading?: boolean

    // 提交按钮文字
    submitText?: string

    // 重置Loading
    resetLoading?: boolean

    // 重置按钮文字
    resetText?: string

    //  隐藏重置按钮
    hideReset?: boolean

    // 提交事件 (传入该事件后会覆盖 onFinish | onFinishFailed 事件)
    onSubmit?(validate: SchemaFormCommonExpose['validate'], model: Recordable): void

    // 提交表单且数据验证成功后回调事件
    onFinish?(model: Recordable): void

    // 提交表单且数据验证失败后回调事件
    onFinishFailed?(error: any): void

    // 重置方法
    onReset?(validate: SchemaFormCommonExpose['resetFields'], model: Recordable): void
}
```
