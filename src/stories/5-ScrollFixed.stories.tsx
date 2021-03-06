import React from 'react'
import Provider from '../Provider'
import ScrollFixed from '../components/ScrollFixed'

export default {
  title: 'ScrollFixed'
}

export const _ScrollFixed = () => (
  <Provider>
    <div style={{ paddingTop: '500px'}}>
      <div style={{display: 'flex'}}>
        <div style={{ height: '100px', width: '200px'}}>
          <ScrollFixed fixedTop={100}>
            <div style={{ height: '100%', backgroundColor: '#333'}}>
              sssss
            </div>
          </ScrollFixed>
        </div>
        <div style={{ height: '3000px', width: '100%', backgroundColor: '#00f'}}>
          xxxx
        </div>
      </div>
    </div>
  </Provider>
)
