import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error info somewhere
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{ this.state.errorInfo }</p>
        </div>
      );
    }
    return this.props.children;
  }
}