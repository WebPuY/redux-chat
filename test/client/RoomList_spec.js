import React from 'react'
import { expect } from "chai"
import ReactDOM from 'react-dom'
import {fromJS,Map,List} from "immutable"

import RoomList from '../../src/client/components/RoomList'

import TestUtil,{
    Simulate,
    renderIntoDocument,//用来渲染RoomList这个组件，然后用下面两个scry方法，来检查和获取dom元素
    isCompositeComponentWithType,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'

describe('RoomList组件',() => {
    it('render RoomList' , () => {
        const rooms = fromJS([
            {id:'0',name:'room',owner:'yp'},
            {id:'1',name:'room2',owner:'pp'}
        ])

        const component = renderIntoDocument(
            <RoomList rooms={rooms} currentRoom="1"/>
        )

        const $rooms = scryRenderedDOMComponentsWithTag(component,'a')
        expect( $rooms.length ).to.equal(2)
        const $active = scryRenderedDOMComponentsWithClass(component,'active')
        expect( $active.length ).to.equal(1)
    })

    it('能够切换房间',() => {
        const rooms = fromJS([
            {id:'0',name:'room',owner:'yp'},
            {id:'1',name:'room2',owner:'pp'}
        ])
        var currentRoom = '0'
        
        function switchRoom(id){
            console.log('change id:',id)
            currentRoom = id
        }

        const RoomListElm = (
            <RoomList rooms={rooms}
                currentRoom={currentRoom}
                switchRoom={switchRoom}/>
        )
        const component = renderIntoDocument( RoomListElm )
        const $rooms = scryRenderedDOMComponentsWithTag(component,'a')
        Simulate.click( ReactDOM.findDOMNode($rooms[1]))
        expect( currentRoom ).to.equal('1')

    })
})

