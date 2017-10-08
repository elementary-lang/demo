import React from 'react'
import parser from './parser/index'
import { withReducer } from 'recompose'
import R from 'ramda'
import CodeMirror from 'react-codemirror2'
import 'codemirror-xml'
import 'codemirror-js'

const { cond, equals, T, always, merge } = R

const enhance = withReducer(
  'data',
  'dispatch',
  (state = { el: '', code: '' }, action) => {
    return cond([
      [equals('SET_CODE'), () => merge(state, { code: action.payload })],
      [equals('SET_EL'), () => merge(state, { el: action.payload })],
      [T, always(state)]
    ])(action.type)
  },
  {
    el: `<function name="hello">
  <js>"Hello World"</js>
</function>

<hello />
  `
  }
)

export default enhance(props => (
  <div className="flex flex-column avenir">
    <div className="flex justify-between h3 bg-blue">
      <h1 className="white ph3">Elementary</h1>
      <button
        onClick={e => {
          parser(props.data.el, (err, code) => {
            props.dispatch({ type: 'SET_CODE', payload: code })
          })
        }}
      >
        Parse
      </button>
    </div>
    <div className="flex vh-100">
      <div className="w-50 pr1">
        <CodeMirror
          value={props.data.el}
          options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={(editor, metadata, value) =>
            props.dispatch({ type: 'SET_EL', payload: value })}
          className="vh-100 w-100 br2 f4 monaco black-80"
          style={{ height: '800px' }}
        />
      </div>
      <div className="w-50 pl1 ">
        <CodeMirror
          value={props.data.code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          className="vh-100 w-100 f4 monaco black-80"
        />
      </div>
    </div>
  </div>
))
