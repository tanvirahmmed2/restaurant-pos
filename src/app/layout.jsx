import React from 'react'

export const metadata={
    title:'Restaurant',
    description:'Restaurant webpage'
}

const MainLayout = async ({ children }) => {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default MainLayout
