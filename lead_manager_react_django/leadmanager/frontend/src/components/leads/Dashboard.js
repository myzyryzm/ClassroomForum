import React , { Fragment } from 'react'
import Form from "./Form"
import Leads from "./Leads"
import Topics from "./Topics"

export default function Dashboard() {
    return (
        <Fragment>
            <Topics />
            <Leads />
            <Form />
        </Fragment>
    )
}