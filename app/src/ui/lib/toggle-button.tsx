import * as React from 'react'
import * as classNames from 'classnames'

interface IToggleButtonProps {
  /** A function to call on click. */
  readonly onClick?: (checked: boolean) => void

  /** The title of the button. */
  readonly children?: string

  /** Is the button disabled? */
  readonly disabled?: boolean

  /** CSS class names */
  readonly className?: string

  /**
   * The `ref` for the underlying <button> element.
   *
   * Ideally this would be named `ref`, but TypeScript seems to special-case its
   * handling of the `ref` type into some ungodly monstrosity. Hopefully someday
   * this will be unnecessary.
   */
  readonly onButtonRef?: (instance: HTMLButtonElement) => void
}

interface IToggleButtonState {
  readonly isChecked: boolean
}

/** A button component. */
export class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {

  public constructor(props: IToggleButtonProps) {
    super(props)

    this.state = { isChecked: false }
  }

  public render() {
    const classNameState = this.state.isChecked ? 'checked' : 'unchecked'
    const className = classNames('button-component', this.props.className, classNameState)

    return (
      <button
        className={className}
        disabled={this.props.disabled}
        onClick={this.onClick}
        type='button'
        ref={this.props.onButtonRef}>
        {this.props.children}
      </button>
    )
  }

  private onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const isChecked = !this.state.isChecked
    this.setState(prevState => ({
      isChecked
    }))

    const onClick = this.props.onClick
    if (onClick) {
      onClick(isChecked)
    }
  }
}
