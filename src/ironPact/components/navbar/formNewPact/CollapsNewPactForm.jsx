import React from 'react'
import { NewPactForm } from './NewPactForm'
import { InformationBox } from '../informationSection/informationBox'


export const CollapsNewPactForm = () => {
    return (
        <div className='flex flex-row '>
            <InformationBox/>
            <details className="collapse bg-base-200">
                <summary className="collapse-title text-xl font-medium">Create New Pact</summary>
                <div className="collapse-content">
                    <NewPactForm />
                </div>
            </details>
        </div>
    )
}
