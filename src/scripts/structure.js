const CreateStructure = (structure) => {
    const newStructure = []
    structure.forEach(organization => {
        const newOrg = {}
        organization.divisions.forEach(division => {
            delete Object.assign(division, division, { ['children']: division['subdivisions'] })['subdivisions'];
        })
        delete Object.assign(newOrg, organization, { ['children']: organization['divisions'] })['divisions'];
        newStructure.push(newOrg)
    });

    return newStructure
}

export default CreateStructure