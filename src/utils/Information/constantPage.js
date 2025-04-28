export const auctionMoneyToken = '0x1a07D3BD80A2B6335d5871b82fb3270602840e62'
export const auctionMoneyTokenSepolia = '0x924310eb92092562D693bF811Dd6306018a3bF48'


export const publicRPCsepoli = 'https://rpc.ankr.com/eth_sepolia'

export const publicRPC = 'https://testnet.skalenodes.com/v1/juicy-low-small-testnet'




export const tableStyle = {
    color: "#f1f5f9",
    border: 0,
    borderRadius: '8px',
    backgroundColor: '#0f172a',
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#000000', // slate-800
        color: '#000000',
        fontSize: '1rem',
        borderBottom: '2px solid #334155',
        minHeight: '56px !important',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: '700 !important',
        letterSpacing: '0.5px',
    },
    '& .MuiDataGrid-row': {
        '&:hover': {
            backgroundColor: 'rgba(56, 182, 255, 0.15) !important',
            outline: '1px solid rgba(56, 182, 255, 0.5)',
            boxShadow: '0 0 12px rgba(56, 182, 255, 0.2)',
            '& .MuiDataGrid-cell': {
                color: '#38b6ff !important' // Testo blu elettrico
            }
        }
    },
    '& .MuiDataGrid-cell': {
        border: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        minHeight: '54px !important',
        padding: '0 16px',
        '&:focus': {
            outline: 'none',
        },
    },
    '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#1e293b',
        borderTop: '2px solid #334155',
    },
    '& .MuiTablePagination-root': {
        color: '#94a3b8',
        fontSize: '0.95rem',
    },
    '& .MuiTablePagination-actions .MuiSvgIcon-root': {
        color: '#64748b',
        fontSize: '1.25rem',
        '&:hover': {
            color: '#60a5fa',
        },
    },
    '& .MuiDataGrid-virtualScroller': {
        scrollbarWidth: 'thin',
        scrollbarColor: '#3b82f6 transparent',
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
        },
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '&': {
        maxWidth: '100%',
        overflowX: 'auto',
    },

    '& .MuiDataGrid-main': {
        minWidth: '600px',
        maxWidth: '100%',
    },
}