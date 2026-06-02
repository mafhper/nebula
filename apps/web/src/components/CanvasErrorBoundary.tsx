import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  label: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`[CanvasErrorBoundary] ${this.props.label}:`, error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="canvas-error-fallback" role="alert">
          <p>Failed to render {this.props.label}</p>
          <span>{this.state.errorMessage}</span>
        </div>
      );
    }

    return this.props.children;
  }
}
